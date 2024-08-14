import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import TableOrder from "./TableOrder";

const HistoryPage = () => {
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs());
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs());

  const handleApply = () => {
    console.log(startDate, endDate);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <span className="text-xl font-bold">History</span>

        {/* Filter */}
        <div className="flex gap-4 items-center">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                label="Start Date"
                value={startDate}
                onChange={(newValue) => setStartDate(newValue)}
              />
            </DemoContainer>
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                label="End Date"
                value={endDate}
                onChange={(newValue) => setEndDate(newValue)}
                minDate={startDate ?? undefined}
              />
            </DemoContainer>
          </LocalizationProvider>
          <div>
            <button
              onClick={handleApply}
              className="button-base"
              disabled={!endDate || !startDate || endDate < startDate}
              style={{
                backgroundColor:
                  !endDate || !startDate || endDate < startDate
                    ? "#ccc"
                    : "#279eff",
              }}
            >
              Apply
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <TableOrder />
    </div>
  );
};

export default HistoryPage;
