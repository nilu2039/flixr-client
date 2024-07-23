import { BaseUserType } from "@/hooks/useAuth";
import { create } from "zustand";

type EditorStore = {
  editor: Partial<BaseUserType> | null;
  setEditor: (editor: Partial<BaseUserType> | null) => void;
};

const useEditorStore = create<EditorStore>()((set) => ({
  editor: null,
  setEditor: (editor) => set({ editor }),
}));

export default useEditorStore;
