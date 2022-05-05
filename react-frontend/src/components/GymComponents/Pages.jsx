import React from 'react';
import {Pagination} from "@mui/material";

const Pages = ({gymsPerPage, totalGyms, currPage ,paginate}) => {

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalGyms / gymsPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <div>
            {!!totalGyms &&(
                    <Pagination
                        count={pageNumbers.length}
                        page={currPage}
                        onChange={(_,num) => paginate(num)}
                    />
                )
            }
        </div>

    );
};

export default Pages;