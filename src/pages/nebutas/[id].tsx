import { GetServerSideProps, NextPage } from "next";

import { NebutaPage } from "../../components/Nebuta";
import { dataset__nebutas, Nebuta } from "../../components/RootMain";

const NebutaTop: NextPage<{ nebuta: Nebuta }> = (props) => <NebutaPage {...props}></NebutaPage>;

export default NebutaTop;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id;
  if (!id) throw new Error("missing id");
  let nebuta = dataset__nebutas.find((nebuta) => nebuta.id === Number(id));

  if (!nebuta) return { notFound: true };

  return {
    props: {
      nebuta,
    },
  };
};
