import { RootState } from '~/store/configure-store';

import { FiltersStateI } from './filtersSlice';

export const selectedFilters = (state: RootState): FiltersStateI => state.filters;
