import "./style/global.css";
import ColorConvertPage from "./page/home/ColorConvertPage";
import { Toast } from "@/components/common/Toast";

function App() {
  return (
    <>
      <ColorConvertPage />
      <Toast />
    </>
  );
}

export default App;
