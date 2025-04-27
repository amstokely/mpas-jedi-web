import Navbar from './components/Navbar/Navbar';
import Background from "./components/Background/Background";
import Card from "./components/Card/Card";

const App = () => {
    return (
        <div className={"h-screen w-screen"}>
            <Navbar/>
            <Background/>
            <div className="flex items-center justify-center min-h-screen w-full p-8">
                <div className="flex gap-8 w-full max-w-6xl justify-center">
                    <Card className="flex-1 max-w-[500px] aspect-square">
      <span className="text-amber-50 text-2xl text-center">
          Ivette Banos
      </span>
                    </Card>
                    <Card className="flex-1 max-w-[500px] aspect-square">
      <span className="text-amber-50 text-xl text-center">
          Andy Stokely
      </span>
                    </Card>
                </div>
            </div>


        </div>
    );
};

export default App;
