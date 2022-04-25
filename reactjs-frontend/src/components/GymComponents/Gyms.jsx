import React, {useState} from 'react';
import {
    Button,
    Container,
    Skeleton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField
} from "@mui/material";
import ContestService from "../../services/ContestService";

const Gyms = ({gyms, loading, searchHandler}) => {

    const addGym = (gymId) =>{
        ContestService.saveGym(gymId).then((response) =>{
            console.log(response)
        }).catch(error => {
            console.log(error)
        });
    }

    const getInfoGym = () =>{

    }

    return !loading ? (
        <Container>
            <TextField label="Search.." variant="outlined" style={{width: "100%"}}
                       onChange={(event) => searchHandler(event.target.value)}/>
            <Table sx={{minWidth: 650, height: "100%"}} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell align="left">Name</TableCell>
                        <TableCell align="center">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {gyms.map((gym) => (
                        <TableRow
                            key={gym.id}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell>{gym.id}</TableCell>
                            <TableCell align="left">{gym.name}</TableCell>
                            <TableCell align="center">
                                <Button color="secondary" variant="contained" onClick={()=>console.log("Info " + gym.id)}>Info</Button>
                            </TableCell>
                            <TableCell align="center">
                                <Button variant="contained" onClick={()=>addGym(gym.id)}>Add</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Container>
    ) : (
        <Skeleton animation="wave" height={500}/>
    );
};

export default Gyms;