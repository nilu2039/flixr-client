import { Disc3 } from "lucide-react";

const FullPageLoader = () => {
  return (
    <div className="h-dvh w-screen grid place-content-center animate-spin">
      <Disc3 className="w-40 h-40" />
    </div>
  );
};

export default FullPageLoader;
