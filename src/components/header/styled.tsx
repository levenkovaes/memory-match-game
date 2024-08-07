import { Button, styled } from "@mui/material";

export const SButton = styled(Button)(({ theme }) => ({
  "&:hover": {
    backgroundColor: theme.palette.primary.light,
  },
}));
