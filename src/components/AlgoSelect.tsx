import React from "react";
import Select from "react-select";
import { TAlgo } from "../types/TAlgo";

interface Props {
  algos: TAlgo[];
  setAlgo: React.Dispatch<React.SetStateAction<TAlgo>>;
}

const AlgoSelect = React.memo<Props>(({ algos, setAlgo }) => {
  const selectStyles = {
    option: (provided: Object, state: any) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#333333" : "#222222",
    }),
    menu: (provided: Object, state: Object) => ({
      ...provided,
      backgroundColor: "#222222",
      borderRadius: 0,
    }),
    control: (provided: Object, state: Object) => ({
      ...provided,
      borderRadius: 0,
    }),
  };
  return (
    <>
      <span className="text">Select an algorithm:</span>
      <Select
        id="algoSelect"
        options={algos}
        getOptionLabel={(o) => o.name}
        defaultValue={algos[0]}
        styles={selectStyles}
        onChange={(o) => {
          if (o) setAlgo(o as TAlgo);
        }}
      />
    </>
  );
});

export default AlgoSelect;
