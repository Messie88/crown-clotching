import { createSelector } from "reselect";

const selectDirectory = state => state.directory;

export const selectDirectorySeactions = createSelector(
    [selectDirectory],
    directory => directory.sections
);