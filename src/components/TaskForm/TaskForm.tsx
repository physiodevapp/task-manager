import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useForm } from "../../context/form";
import { taskListTaskItemSelect } from "../../features/taskList/taskListSlice";
import { useAppSelector } from "../../app/hooks";

export const TaskForm = () => {
  const { type, closeForm } = useForm();
  const taskListTaskItem = useAppSelector(taskListTaskItemSelect);

  const handleClose = () => {
    closeForm();
  };

  // useEffect(() => {
  //   console.log(taskListTaskItem);
  //   console.log(type);
  // }, [taskListTaskItem, type])

  return (
    <>
      <Dialog open={type === "task"} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {taskListTaskItem ? "Task details" : "Add a new task"}
        </DialogTitle>
        <DialogContent>
          <div style={{ marginBottom: "20px", textAlign: "center" }}>
            <img
              src={"https://via.placeholder.com/100"}
              alt="Task"
              style={{ width: "100%", height: "auto", maxHeight: "150px", borderRadius: "8px" }}
            />
          </div>
          <TextField
            autoFocus
            margin="dense"
            id="taskName"
            name="taskName"
            label="Task name"
            type="text"
            fullWidth
            variant="outlined"
            defaultValue={""}
          />
          <TextField
            margin="dense"
            id="status"
            name="status"
            label="Status"
            type="text"
            fullWidth
            variant="outlined"
            defaultValue={"Backlog"}
          />
          <TextField
            margin="dense"
            id="tags"
            name="tags"
            label="Tags"
            type="text"
            fullWidth
            variant="outlined"
            defaultValue={
              "Concept, Technical"
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            {taskListTaskItem ? "Save" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
