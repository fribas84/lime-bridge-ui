import type { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import useToken from "../hooks/useToken";
import Table from "react-bootstrap/Table";
import { Button, Dropdown } from "react-bootstrap";
import Borrowed from "./Borrowed";
import NewBook from "./NewBook";
import { ethers } from "ethers";
import ErrorHandler from "./ErrorHandler";
import LoaderTransaction from "./LoaderTransaction";

const Balance = () => {
  useEffect(() => {}, []);

  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Select Origin Network
        </Dropdown.Toggle>
        <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Goerli</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Mumbai</Dropdown.Item>
      </Dropdown.Menu>
      </Dropdown>

      <style jsx>{`
        .results-form {
          display: flex;
          flex-direction: column;
        }

        .button-wrapper {
          margin: 5px;
          float: right;
        }
        .bookRentWrapper {
          float: left;
        }
        .upperTable {
          position: inline;
        }
        .actionButton {
          margin: 1px;
          padding: 1px;
        }
      `}</style>
    </div>
  );
};

export default Balance;
