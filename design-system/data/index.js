import ADNIcon from "../assets/icons/dna.svg";
import HeartIcon from "../assets/icons/heart.svg";
import ShieldIcon from "../assets/icons/shield.svg";
import SpaceShip from "../assets/icons/space-ship.svg";
import GeneticIcon from "../assets/icons/genetic.svg";
import { colors } from "../constants/colors";

export const data = [
  {
    id: "ased45",
    title: "L'ADN pour les nuls",
    description: "Premier chapitre - qui a découvert l'ADN ?",
    icon: <ADNIcon width={50} height={50} />,
    color: colors.VIOLET,
  },
  {
    id: "ased78",
    title: "Les bases de la biologie",
    description: "Premier chapitre - Quel est le rôle du coeur",
    icon: <HeartIcon width={50} height={50} />,
    color: colors.PURPLE,
  },
  {
    id: "ased12",
    title: "La cybersécurité",
    description: "Un véritable enjeu ces dernières années",
    icon: ShieldIcon,
    color: colors.DARK,
  },
  {
    id: "ased07",
    title: "La conquête de l'espace",
    description: "Le destin des astronautes",
    icon: SpaceShip,
    color: colors.ORANGE,
  },
  {
    id: "ased99",
    title: "La physique quantique",
    description:
      "Et si nous ne n'étions qu'au début des découvertes scientifiques ...",
    icon: GeneticIcon,
    color: colors.GREY,
  },
];
