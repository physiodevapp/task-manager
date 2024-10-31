import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useForm as useFormContext } from "../../context/form";
import {
  setActiveTaskItem,
  taskListTaskItemSelect,
} from "../../features/taskList/taskListSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Controller, useForm } from "react-hook-form";
import Select, { components as defaultComponents } from "react-select";
import { FormControl, FormLabel, IconButton, useTheme } from "@mui/material";
import { taskListCreateThunk } from "../../features/taskList/taskListCreateThunk";
import { boardListBoardItemSelect } from "../../features/boardList/boardListSlice";
import { v4 as uuidv4 } from "uuid";
import { TaskInterface } from '../../modelnterface';
import { taskListUpdateThunk } from "../../features/taskList/taskListUpdateThunk";
import mockTagList from "../../data/mock_tagList.json";
import CloseIcon from "@mui/icons-material/Close";
import { taskListDeleteThunk } from "../../features/taskList/taskListDeleteThunk";

export const TaskForm = () => {
  const { type, closeForm } = useFormContext();

  const taskListTaskItem = useAppSelector(taskListTaskItemSelect);
  const taskListDispatch = useAppDispatch();

  const boardListBoardItem = useAppSelector(boardListBoardItemSelect);

  const theme = useTheme();

  const [isTagsFocused, setIsTagsFocused] = useState(false);
  const [hasTagsValue, setHasTagsValue] = useState(false);
  const [isStatusesFocused, setIsStatusesFocused] = useState(false);
  const [hasStatusesValue, setHasStatusesValue] = useState(false);

  const statusOptions = [
    { value: "backlog", label: "Backlog" },
    { value: "in_progress", label: "In Progress" },
    { value: "in_review", label: "In Review" },
    { value: "completed", label: "Completed" },
  ];

  const { handleSubmit, control, reset, getValues } = useForm({
    defaultValues: {
      taskName: taskListTaskItem?.title || "",
      status: taskListTaskItem?.status
        ? statusOptions.find(
            (option) => option.value === taskListTaskItem.status
          )
        : { value: "backlog", label: "Backlog" },
      tags: taskListTaskItem
        ? taskListTaskItem.tags?.map((tag) => ({ value: tag, label: tag }))
        : null,
    },
  });

  const onSubmit = ({ taskName, status }: any) => {
    let task;

    if (!taskListTaskItem) {
      task = {
        id: uuidv4(),
        title: taskName,
        description: "",
        boardId: boardListBoardItem!.id,
        status: status.value,
      };

      taskListDispatch(taskListCreateThunk({ item: task }));
    } else {
      task = {
        id: taskListTaskItem.id,
        title: taskName,
        description: "",
        boardId: boardListBoardItem!.id,
        status: status.value,
      };

      taskListDispatch(taskListUpdateThunk({ item: task }));
    }

    closeForm();
  };

  const handleClose = () => {
    taskListDispatch(setActiveTaskItem(null));

    closeForm();
  };

  const handleDelete = () => {
    if (taskListTaskItem)
      taskListDispatch(taskListDeleteThunk({item: taskListTaskItem}));
  }

  useEffect(() => {
    if (taskListTaskItem)
      reset({
        taskName: taskListTaskItem.title,
        status: taskListTaskItem?.status
          ? statusOptions.find(
              (option) => option.value === taskListTaskItem.status
            )
          : { value: "backlog", label: "Backlog" },
        tags: taskListTaskItem
          ? taskListTaskItem.tags?.map((tag) => ({ value: tag, label: tag }))
          : null,
      });
    else
      reset({
        taskName: "",
        status: { value: "backlog", label: "Backlog" },
        tags: null,
      });

    setHasStatusesValue(!!getValues("status"));
    setHasTagsValue(!!getValues("tags"));
  }, [taskListTaskItem, reset]);

  return (
    <>
      <Dialog
        open={type === "task"}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {taskListTaskItem ? "Task details" : "Add a new task"}
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              color: (theme) => theme.palette.grey[500],
              position: "absolute",
              right: theme.spacing(1),
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <div style={{ marginBottom: "20px", textAlign: "center" }}>
              <img
                src={"https://via.placeholder.com/100"}
                alt="Task"
                style={{
                  width: "100%",
                  height: "auto",
                  maxHeight: "150px",
                  borderRadius: "8px",
                }}
              />
            </div>

            <Controller
              name="taskName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="dense"
                  label="Task name"
                  type="text"
                  fullWidth
                  variant="outlined"
                  sx={{
                    marginBottom: 0,
                  }}
                />
              )}
            />

            <FormControl fullWidth>
              <FormLabel
                htmlFor="statuses-select"
                style={{
                  position: "absolute",
                  zIndex: 10,
                  left: "12px",
                  top: isStatusesFocused || hasStatusesValue ? "10%" : "60%",
                  fontSize:
                    isStatusesFocused || hasStatusesValue
                      ? theme.typography.caption.fontSize
                      : "1rem",
                  borderRadius: theme.shape.borderRadius,
                  color: isStatusesFocused
                    ? theme.palette.primary.main
                    : theme.palette.text.secondary,
                  transform:
                    isStatusesFocused || hasStatusesValue
                      ? "translateY(0%)"
                      : "translateY(-50%)",
                  transition: "all 0.2s ease-in-out",
                  backgroundColor:
                    theme.palette.mode === "dark"
                      ? "#4d5054"
                      : theme.palette.common.white,
                  padding: "0 4px",
                  pointerEvents: "none", // Evita que el label interfiera con el clic del Select
                }}
              >
                Status
              </FormLabel>

              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    value={
                      statusOptions.find(
                        (option) => option.value === field.value?.value
                      ) || null
                    }
                    inputId="statuses-select"
                    styles={{
                      control: (base) => ({
                        ...base,
                        boxSizing: "border-box",
                        backgroundColor: "inherit",
                        marginTop: theme.spacing(2),
                        padding: theme.spacing(0),
                        height: "3.5em",
                        "&:hover:not(:focus-within)": {
                          borderColor: theme.palette.text.primary,
                        },
                        "&:focus-within": {
                          boxShadow: `inset 0 0 0 1px ${theme.palette.primary.main}`,
                        },
                      }),
                      valueContainer: (base) => ({
                        ...base,
                        gap: "0.4em",
                      }),
                      menu: (base) => ({
                        ...base,
                        backgroundColor: theme.palette.background.paper,
                        color: theme.palette.text.primary,
                        borderRadius: theme.shape.borderRadius,
                        boxShadow: theme.shadows[3],
                        zIndex: 100,
                      }),
                      singleValue: (base) => ({
                        ...base,
                        color: theme.palette.text.primary,
                      }),
                      option: (base, state) => ({
                        ...base,
                        backgroundColor: state.isSelected
                          ? theme.palette.primary.light // Color para los elementos seleccionados
                          : state.isFocused
                          ? theme.palette.action.hover // Color cuando el elemento está enfocado
                          : "transparent",
                        color: state.isSelected
                          ? theme.palette.primary.contrastText // Color del texto cuando está seleccionado
                          : theme.palette.text.primary, // Color del texto por defecto
                        "&:active": {
                          backgroundColor: theme.palette.primary.main, // Color de fondo cuando se hace clic
                        },
                      }),
                      input: (base) => ({
                        ...base,
                        color: theme.palette.text.primary, // Cambia este valor para definir el color del texto
                      }),
                      placeholder: (base, state) => ({
                        ...base,
                        color: state.isFocused
                          ? theme.palette.divider // Color del placeholder cuando está enfocado
                          : theme.palette.grey[400], // Color del placeholder cuando no está enfocado
                      }),
                    }}
                    menuPlacement="auto"
                    placeholder=""
                    isClearable={true}
                    isDisabled={!taskListTaskItem}
                    components={{
                      DropdownIndicator: !taskListTaskItem
                        ? () => null
                        : defaultComponents.DropdownIndicator,
                      IndicatorSeparator: !taskListTaskItem
                        ? () => null
                        : defaultComponents.IndicatorSeparator,
                    }}
                    options={statusOptions}
                    classNamePrefix="select"
                    onFocus={() => setIsStatusesFocused(true)}
                    onBlur={() => setIsStatusesFocused(false)}
                    onChange={(option) => {
                      field.onChange(option ? option : null); // Extrae solo el valor seleccionado
                      setHasStatusesValue(option != null);
                    }}
                  />
                )}
              />
            </FormControl>

            <FormControl fullWidth>
              <FormLabel
                htmlFor="tags-select"
                style={{
                  position: "absolute",
                  zIndex: 10,
                  left: "12px",
                  top: isTagsFocused || hasTagsValue ? "10%" : "60%",
                  fontSize:
                    isTagsFocused || hasTagsValue
                      ? theme.typography.caption.fontSize
                      : "1rem",
                  borderRadius: theme.shape.borderRadius,
                  color: isTagsFocused
                    ? theme.palette.primary.main
                    : theme.palette.text.secondary,
                  transform:
                    isTagsFocused || hasTagsValue
                      ? "translateY(0%)"
                      : "translateY(-50%)",
                  transition: "all 0.2s ease-in-out",
                  backgroundColor:
                    theme.palette.mode === "dark"
                      ? "#4d5054"
                      : theme.palette.common.white,
                  padding: "0 4px",
                  pointerEvents: "none", // Evita que el label interfiera con el clic del Select
                }}
              >
                Tags
              </FormLabel>

              <Controller
                name="tags"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    inputId="tags-select"
                    styles={{
                      control: (base) => ({
                        ...base,
                        boxSizing: "border-box",
                        backgroundColor: "inherit",
                        marginTop: theme.spacing(2),
                        padding: theme.spacing(0),
                        height: "3.5em",
                        "&:hover:not(:focus-within)": {
                          borderColor: theme.palette.text.primary,
                        },
                        "&:focus-within": {
                          boxShadow: `inset 0 0 0 1px ${theme.palette.primary.main}`,
                        },
                      }),
                      valueContainer: (base) => ({
                        ...base,
                        gap: "0.4em",
                      }),
                      menu: (base) => ({
                        ...base,
                        backgroundColor: theme.palette.background.paper,
                        color: theme.palette.text.primary,
                        borderRadius: theme.shape.borderRadius,
                        boxShadow: theme.shadows[3],
                        zIndex: 100,
                      }),
                      multiValue: (base) => ({
                        ...base,
                        textTransform: "capitalize",
                        backgroundColor: theme.palette.action.selected,
                        padding: theme.spacing(0.8),
                      }),
                      multiValueLabel: (base) => ({
                        ...base,
                        color: theme.palette.text.primary,
                      }),
                      multiValueRemove: (base) => ({
                        ...base,
                        color: theme.palette.error.main,
                        ":hover": {
                          backgroundColor: theme.palette.error.light,
                          color: "white",
                        },
                      }),
                      option: (base, state) => ({
                        ...base,
                        textTransform: "capitalize",
                        backgroundColor: state.isSelected
                          ? theme.palette.primary.light // Color para los elementos seleccionados
                          : state.isFocused
                          ? theme.palette.action.hover // Color cuando el elemento está enfocado
                          : "transparent",
                        color: state.isSelected
                          ? theme.palette.primary.contrastText // Color del texto cuando está seleccionado
                          : theme.palette.text.primary, // Color del texto por defecto
                        "&:active": {
                          backgroundColor: theme.palette.primary.main, // Color de fondo cuando se hace clic
                        },
                      }),
                      input: (base) => ({
                        ...base,
                        color: theme.palette.text.primary, // Cambia este valor para definir el color del texto
                      }),
                      placeholder: (base, state) => ({
                        ...base,
                        color: state.isFocused
                          ? theme.palette.divider // Color del placeholder cuando está enfocado
                          : theme.palette.grey[400], // Color del placeholder cuando no está enfocado
                      }),
                    }}
                    menuPlacement="auto"
                    placeholder=""
                    isMulti
                    options={mockTagList.map((tag) => ({
                      value: tag.Title,
                      label: tag.Title,
                    }))}
                    classNamePrefix="select"
                    onFocus={() => setIsTagsFocused(true)}
                    onBlur={() => setIsTagsFocused(false)}
                    onChange={(value) => {
                      field.onChange(value);
                      setHasTagsValue(value.length > 0);
                    }}
                  />
                )}
              />
            </FormControl>
          </DialogContent>
          <DialogActions
            sx={{ padding: theme.spacing(3), paddingTop: theme.spacing(2) }}
          >
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary">
              {taskListTaskItem ? "Save" : "Add"}
            </Button>
            {taskListTaskItem ? (
              <Button
                type="submit"
                variant="contained"
                color="error"
                sx={{ position: "absolute", left: theme.spacing(2) }}
                onClick={handleDelete}
              >
                Delete
              </Button>
            ) : (
              <></>
            )}
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};
