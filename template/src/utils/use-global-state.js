import create from "zustand";

export default create((set) => ({
	stuff: "",
	setStuff: (stuff) => set({ stuff }),
}));
