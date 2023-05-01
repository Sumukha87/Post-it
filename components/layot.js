import { Children } from "react";
import Nav from "./Nav";

export default function Layot({children}){
    return (
        <div className="mx-6 md:max-w-2xl md:mx-auto font-poppins">
            <Nav/>
            <main>
                {children}
            </main>
        </div>
    );
}