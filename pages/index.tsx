import { useWeb3React } from "@web3-react/core";
import Head from "next/head";
import Link from "next/link";
import NativeCurrencyBalance from "../components/NativeCurrencyBalance";
import Account from "../components/Account";
import { GOERLI_TOKEN,MUMBAI_TOKEN,GOERLI_BRIDGE,MUMBAI_BRIDGE} from "../constants";
import useEagerConnect from "../hooks/useEagerConnect";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from "react-bootstrap";
import TokenBalance from "../components/TokenBalance";
import Library from "../components/Library";
import Balance from "../components/Balance";
import Bridge from "../components/Bridge";
import { useState } from "react";


enum Networks{
  Goerli,
  Mumbai
}

function Home() {
  const { account, library } = useWeb3React();
  const triedToEagerConnect = useEagerConnect();
  const isConnected = typeof account === "string" && !!library;
  const [network, setNetwork] = useState<number>(0);
  
  
  const handleSetNetork = (network:number) => {
    setNetwork(0);
  }
  return (
    
    <div>
      <Head>
        <title>Lime Academy Bridge - Fernando Ribas</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
      <header>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <div className="navbar-brand">
              <a className="navbar-brand" href="#">LimeAcademy - Bridge </a>
            </div>
 
          </div>


          <Account triedToEagerConnect={triedToEagerConnect} />
        </nav>
      </header>

      <main>
        <h1>
          The Bridge!
        </h1>

        {isConnected && (
          <>
          <section>
            <Balance contractAddress={TOKEN1_ADDRESS} />
            <Balance contractAddress={TOKEN2_ADDRESS} />
          </section>
          <section>
            <Bridge></Bridge>
          </section>
          </>
        )}
      </main>

      <style jsx>{`
        nav {
          display: flex;
          justify-content: space-between;
        }

        main {
          text-align: center;
        }
      `}</style>
 
      </Container>
         </div>
  );
}

export default Home;
