import React from "react";
import { Card, Heading } from "rimble-ui";

const CardComponent = ({ children }) => (
  <Card width={"auto"} maxWidth={"730px"} mx={"auto"} px={[3, 3, 4]}>
        <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        }}>
            <Heading as={"h1"}>Random Winner with Chainlink VRF</Heading>
        </div>
        {children}
  </Card>
);

export default CardComponent;
