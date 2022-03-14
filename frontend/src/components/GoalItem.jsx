import { useDispatch } from "react-redux";
import { deleteGoal, updateGoal } from "../features/goals/goalSlice";
import { useState } from "react";

function GoalItem({ goal }) {
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [text, setText] = useState(goal.text);

  const onEdit = () => {
    setIsEdit(true);
  };

  const onSave = () => {
    const updatedData = {
      id: goal._id,
      text: { text },
    };
    dispatch(updateGoal(updatedData));
    setIsEdit(false);
    setText(goal.text);
  };

  const onCancel = () => {
    setIsEdit(false);
    setText(goal.text);
  };

  return (
    <div className="goal">
      <div>{new Date(goal.createdAt).toLocaleString("en-US")}</div>
      {isEdit ? (
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      ) : (
        <h2>{goal.text}</h2>
      )}
      <button onClick={() => dispatch(deleteGoal(goal._id))} className="close">
        X
      </button>
      {isEdit ? (
        <>
          <button onClick={onSave} className="edit">
            Save
          </button>
          <button onClick={onCancel} className="edit">
            Cancel
          </button>
        </>
      ) : (
        <button onClick={onEdit} className="edit">
          Edit
        </button>
      )}
    </div>
  );
}

export default GoalItem;
