import styles from "./DifficultyScale.module.css";
import { useState } from "react";
import Modal from "./ui/Modal";

interface DifficultyScaleProps {
  rating: string;
}

const DifficultyScale = ({ rating }: DifficultyScaleProps) => {
  const [showDifficultyDescription, setShowDifficultyDescription] =
    useState(false);
  let classToUse: string = "";

  if (rating === "Easy") classToUse = `${styles.easy}`;
  if (rating === "Medium") classToUse = `${styles.medium}`;
  if (rating === "Hard") classToUse = `${styles.hard}`;

  return (
    <>
      <div
        onClick={() => setShowDifficultyDescription(true)}
        className={`${styles.ratingStyles} ${classToUse}`}
      >
        {rating}
      </div>

      {/* if users are not sure how difficulty is rated they can click the scale */}
      {/* and get a have description */}
      {!showDifficultyDescription ? null : (
        <DifficultyScaleDescription
          action={() => setShowDifficultyDescription(false)}
          show={showDifficultyDescription}
        />
      )}
    </>
  );
};

export default DifficultyScale;

interface DifficultyScaleDescriptionProps {
  action: any;
  show: boolean;
}

const DifficultyScaleDescription = ({
  action,
  show,
}: DifficultyScaleDescriptionProps) => {
  return (
    <Modal show={show} title="Difficulty Scale" onClose={action}>
      <div className={styles.descriptionContainer}>
        <div className={styles.description}>
          <DifficultyScale rating="Easy" />
          <p>
            Easy problems can most likely be solved in your head without paper
            or a calculator.
          </p>
        </div>
        <div className={styles.description}>
          <DifficultyScale rating="Medium" />
          <p>
            Medium problems may be easier to solve with paper or a calculator
          </p>
          <p> These are to really help students recall important material.</p>
        </div>
        <div className={styles.description}>
          <DifficultyScale rating="Hard" />
          <p>
            Hard problems most likely will be easier to solve with paper or a
            calculator.
          </p>
          <p>
            These problems <strong>hardly</strong> make an appearance so do not
            fret.
          </p>
        </div>
      </div>
    </Modal>
  );
};
