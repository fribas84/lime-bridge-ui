import { useWeb3React } from "@web3-react/core";
import Head from "next/head";
import Link from "next/link";
import NativeCurrencyBalance from "../components/NativeCurrencyBalance";
import Account from "../components/Account";
import { LIBRARY_ADDRESS, US_ELECTION_ADDRESS } from "../constants";
import useEagerConnect from "../hooks/useEagerConnect";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from "react-bootstrap";
import TokenBalance from "../components/TokenBalance";
import Library from "../components/Library";


function Home() {
  const { account, library } = useWeb3React();

  const triedToEagerConnect = useEagerConnect();

  const isConnected = typeof account === "string" && !!library;

  return (
    
    <div>
      <Head>
        <title>Lime Academy Library - Fernando Ribas</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
      <header>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <div className="navbar-brand">
              <a className="navbar-brand" href="#">LimeAcademy - Library </a>
            </div>
 
          </div>


          <Account triedToEagerConnect={triedToEagerConnect} />
        </nav>
      </header>

      <main>
        <h1>
          Welcome to Library!
        </h1>

        {isConnected && (
          <section>
            <NativeCurrencyBalance />

            <Library contractAddress={LIBRARY_ADDRESS} />
          </section>
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
