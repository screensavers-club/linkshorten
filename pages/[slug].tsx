import type { NextPage, GetServerSideProps } from "next";
import prisma from "../lib/prisma";

const Slug: NextPage = () => {
  return <div>⛔</div>;
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { slug } = query;

  const link = await prisma.link.findFirst({
    where: { slug: { equals: slug as string } },
  });

  if (!link) {
    return { props: {} };
  }

  return {
    redirect: {
      permanent: true,
      destination: `${link.target}`,
    },
  };
};

export default Slug;
