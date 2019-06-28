import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const Loader = styled.div``;

const Row = styled.li`
  list-style: none;
  margin: 10px;
`;

export const url = "https://randomuser.me/api/?results=5";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function getUsers() {
      try {
        const {
          data: { results }
        } = await axios.get(url);
        setUsers(results);
      } catch (error) {
        console.log(error);
      }
    }
    getUsers();
  }, []);

  return (
    <>
      {users.length === 0 ? (
        <Loader>Loading...</Loader>
      ) : (
        users.map(user => (
          <Row key={user.name.first} data-testid="row">
            {user.name.first}
          </Row>
        ))
      )}
    </>
  );
}

export default Users;
