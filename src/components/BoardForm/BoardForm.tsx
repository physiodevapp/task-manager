import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
  useTheme,
} from "@mui/material";
import { useForm as useFormContext } from "../../context/form";
import CloseIcon from "@mui/icons-material/Close";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { boardListBoardItemSelect } from "../../features/boardList/boardListSlice";
import { Controller, useForm } from "react-hook-form";
import { cloneElement, useEffect, useState } from "react";
import {
  LocalAirportOutlined,
  TrainOutlined,
  DirectionsCarOutlined,
  TwoWheelerOutlined,
  DirectionsBusOutlined,
  FlightOutlined,
  SubwayOutlined,
  DirectionsBoatOutlined,
} from "@mui/icons-material";
import { boardListCreateThunk } from "../../features/boardList/boardListCreate";
import { BoardInterface } from "../../modelnterface";
import { v4 as uuidv4 } from "uuid";


export const BoardForm = () => {
  const { type, closeForm } = useFormContext();

  const theme = useTheme();

  const boardListBoardItem = useAppSelector(boardListBoardItemSelect);
  const boardListDispatch = useAppDispatch();

  type FormValues = {
    boardName: string;
    icon: string | null;
  };

  const { handleSubmit, control, reset, getValues, setValue } = useForm<FormValues>({
    defaultValues: {
      boardName: (type === "edit-board" && boardListBoardItem?.title) || "",
      icon: null,
    },
  });

  const [selectedValue, setSelectedValue] = useState("");

  const radioItems = [
    { value: "plane", icon: <LocalAirportOutlined /> },
    { value: "train", icon: <TrainOutlined /> },
    { value: "car", icon: <DirectionsCarOutlined /> },
    { value: "boat", icon: <DirectionsBoatOutlined /> },
    { value: "motorbike", icon: <TwoWheelerOutlined /> },
    { value: "bus", icon: <DirectionsBusOutlined /> },
    { value: "flight", icon: <FlightOutlined /> },
    { value: "subway", icon: <SubwayOutlined /> },
  ];

  const handleChange = (event: any) => {
    setSelectedValue(event.target.value);
  };

  const handleClose = () => {
    closeForm();
  };

  const onSubmit = (data: any) => {
    const newBoard: BoardInterface =  {
      id: uuidv4(),
      default: 'false',
      title: data.boardName,
      author: "Edu",
      icon: data.icon,
    };

    boardListDispatch(boardListCreateThunk({item: newBoard}));

    closeForm();
  };

  useEffect(() => {
    if (selectedValue)
      setValue("icon", selectedValue);

  }, [selectedValue]);

  useEffect(() => {
    if (boardListBoardItem && type === "edit-board")
      reset({
        boardName: boardListBoardItem.title,
      });
    else if (type === "new-board")
      reset({
        boardName: "",
        icon: null,
      });

    setSelectedValue("");

  }, [type, boardListBoardItem, reset]);

  return (
    <>
      <Dialog
        open={type !== null && ["new-board", "edit-board"].includes(type)}
        maxWidth="sm"
        fullWidth
        onClose={handleClose}
      >
        <DialogTitle>
          {boardListBoardItem ? "Board details" : "Add a new board"}
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              color: theme.palette.grey[500],
              position: "absolute",
              right: theme.spacing(1),
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <Controller
              name="boardName"
              control={control}
              rules={{
                required: "Board name is required",
                minLength: { value: 8, message: "Board name must be at least 8 characters" },
              }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  margin="dense"
                  label="Board name"
                  type="text"
                  fullWidth
                  required
                  error={!!error}
                  helperText={error ? error.message : ""}
                  variant="outlined"
                  sx={{
                    marginBottom: 0,
                  }}
                />
              )}
            />

            <FormControl
              fullWidth
              sx={{
                marginTop: theme.spacing(1),
                padding: `${theme.spacing(1)} ${theme.spacing(2)} 0`,
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <RadioGroup
                  row
                  value={selectedValue}
                  onChange={handleChange}
                  sx={{ gap: 2 }}
                >
                  {radioItems.map((item) => (
                    <FormControlLabel
                      key={item.value}
                      value={item.value}
                      label=""
                      control={
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            p: 0,
                            borderRadius: "50%",
                            cursor: "pointer",
                            backgroundColor:
                              selectedValue === item.value
                                ? "primary.light"
                                : "grey.200",
                          }}
                          onClick={() => setSelectedValue(item.value)}
                        >
                          <Radio
                            checked={selectedValue === item.value}
                            onChange={handleChange}
                            value={item.value}
                            icon={cloneElement(item.icon, {
                              sx: {
                                fontSize: 26,
                                color:
                                  selectedValue === item.value
                                    ? "primary.main"
                                    : "grey.600",
                              },
                            })}
                            checkedIcon={cloneElement(item.icon, {
                              sx: {
                                fontSize: 26,
                                color: "primary.main",
                              },
                            })}
                            sx={{
                              "&:hover": {
                                bgcolor: "transparent",
                              },
                            }}
                          />
                        </Box>
                      }
                    />
                  ))}
                </RadioGroup>
              </Box>
            </FormControl>
          </DialogContent>
          <DialogActions
            sx={{ padding: theme.spacing(3), paddingTop: theme.spacing(1) }}
          >
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit(onSubmit)} type="submit" variant="contained" color="primary">
              {type === "edit-board" ? "Save" : "Add"}
            </Button>
            {type === "edit-board" ? (
              <Button
                type="submit"
                variant="contained"
                color="error"
                sx={{ position: "absolute", left: theme.spacing(2) }}
                // onClick={handleDelete}
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
