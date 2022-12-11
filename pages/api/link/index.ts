import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { nanoid } from "nanoid";

type Data = {
  url: string;
};

type Error = { error: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Error>
) {
  const method = req.method;
  const auth = req.headers.authorization;

  const authStr = `Basic ${Buffer.from(
    `${process.env.API_USER}:${process.env.API_SECRET}`
  ).toString("base64")}`;

  if (auth !== authStr) {
    return res.status(403).json({ error: "Not authorized" });
  }

  switch (method) {
    case "POST":
      try {
        const { target } = req.body;

        let validSlug: boolean = false;
        let desiredSlug: string = "";

        while (!validSlug) {
          desiredSlug = nanoid(5);

          // first, check for collision
          const matchingLink = await prisma.link.findFirst({
            where: { slug: { equals: desiredSlug } },
          });

          if (matchingLink === null) {
            validSlug = true;
          }
        }

        // then check if target already exists
        const existingLink = await prisma.link.findFirst({
          where: { target: { equals: target as string } },
        });

        if (existingLink) {
          return res
            .status(200)
            .json({ url: `${process.env.HOSTNAME}/${existingLink.slug}` });
        }

        // here we can assume desiredSlug is unique already
        const newLink = await prisma.link.create({
          data: {
            target,
            slug: desiredSlug,
          },
        });

        if (newLink) {
          const url = `${process.env.HOSTNAME}/${desiredSlug}`;
          res.status(200).json({ url });
        } else {
          throw new Error("failed to create link");
        }
      } catch (err: any) {
        res.status(500).json({ error: err });
      }

      return;

    default:
      res.status(404).json({ error: "Not found" });
  }
}
