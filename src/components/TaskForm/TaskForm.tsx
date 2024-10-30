import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useForm as useFormContext } from "../../context/form";
import { taskListTaskItemSelect } from "../../features/taskList/taskListSlice";
import { useAppSelector } from "../../app/hooks";
import { Controller, useForm } from "react-hook-form";
import { TaskInterface } from "../../modelnterface";
import Select, { components, GroupBase, PlaceholderProps } from "react-select";
import { useTheme } from "@mui/material";
import { JSX } from "react/jsx-runtime";

export const TaskForm = () => {
  const { type, closeForm } = useFormContext();

  const taskListTaskItem = useAppSelector(taskListTaskItemSelect);

  const theme = useTheme();

  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      taskName: taskListTaskItem?.title || "",
      status: taskListTaskItem?.status || "",
      tags: [
        { value: "Concept", label: "Concept" },
        { value: "Technical", label: "Technical" },
      ],
    },
  });

  const onSubmit = (data: any) => {
    console.log("data ", data);

    closeForm();
  };

  const handleClose = () => {
    closeForm();
  };

  useEffect(() => {
    if (taskListTaskItem)
      reset({
        taskName: taskListTaskItem.title,
        status: taskListTaskItem?.status,
        tags: [
          { value: "Concept", label: "Concept" },
          { value: "Technical", label: "Technical" },
        ],
      });

    setHasValue(true);
  }, [taskListTaskItem, reset]);

  const CustomPlaceholder = (props: any) => {
    const { selectProps, isFocused } = props;
    const placeholderText = isFocused
      ? "Elige una o varias etiquetas..."
      : "Tags";

    return (
      <components.Placeholder {...props}>
        {placeholderText}
      </components.Placeholder>
    );
  };

  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

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
                  autoFocus
                  margin="dense"
                  label="Task name"
                  type="text"
                  fullWidth
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: theme.palette.divider, // Cambia el color del borde del TextField por defecto
                      },
                    },
                  }}
                />
              )}
            />

            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="dense"
                  label="Status"
                  type="text"
                  fullWidth
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: theme.palette.divider, // Cambia el color del borde del TextField por defecto
                      },
                    },
                  }}
                />
              )}
            />

            <div style={{ position: "relative", marginTop: theme.spacing(0) }}>
              <label
                htmlFor="tags-select"
                style={{
                  position: "absolute",
                  zIndex: 10,
                  left: "12px",
                  top: isFocused || hasValue ? "-15%" : "50%",
                  fontSize: isFocused || hasValue ? theme.typography.caption.fontSize : "1rem",
                  borderRadius: theme.shape.borderRadius,
                  color: isFocused
                    ? theme.palette.primary.main
                    : theme.palette.text.secondary,
                  transform: isFocused || hasValue
                    ? "translateY(0%)"
                    : "translateY(-50%)",
                  transition: "all 0.2s ease-in-out",
                  backgroundColor: theme.palette.mode === "dark" ? "#4d5054" : theme.palette.common.white,
                  padding: "0 4px",
                  pointerEvents: "none", // Evita que el label interfiera con el clic del Select
                }}
              >
                Tags
              </label>

              <Controller
                name="tags"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    inputId="tags-select"
                    styles={{
                      control: (base, state) => ({
                        ...base,
                        boxSizing: "border-box",
                        backgroundColor: "inherit",
                        borderColor: state.isFocused
                          ? "transparent"
                          : theme.palette.divider,
                        marginTop: theme.spacing(1),
                        padding: theme.spacing(0),
                        height: "3.5em",
                        boxShadow: state.isFocused
                          ? `inset 0 0 0 1px ${theme.palette.primary.main}` // Simula un borde más grueso sin afectar el tamaño
                          : "none",
                        "&:hover:not(:focus-within)": {
                          borderColor: theme.palette.text.primary,
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
                        zIndex: 100
                      }),
                      multiValue: (base) => ({
                        ...base,
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
                    options={[
                      { value: "Concept", label: "Concept" },
                      { value: "Technical", label: "Technical" },
                      { value: "Urgent", label: "Urgent" },
                      { value: "Review", label: "Review" },
                    ]}
                    classNamePrefix="select"
                    // components={{ Placeholder: CustomPlaceholder }}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    onChange={(value) => {
                      field.onChange(value);
                      setHasValue(value.length > 0);
                    }}
                  />
                )}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary">
              {taskListTaskItem ? "Save" : "Add"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};
