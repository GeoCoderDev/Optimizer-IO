import { createSlice } from "@reduxjs/toolkit";
import { InputSimplex, OutputSimplex } from "../../interfaces/Simplex";
import { CustomEventWorker } from "../../lib/utils/CustomEventWorker";
import WorkerSimplex from "../../lib/workers/Simplex?worker";


const initialState = new CustomEventWorker<InputSimplex,OutputSimplex>(new WorkerSimplex(), "Simplex");

const simplexEventSlice = createSlice({
    name: "simplexEvent",
    initialState,
    reducers: {
        
    }
})

export default  simplexEventSlice.reducer;