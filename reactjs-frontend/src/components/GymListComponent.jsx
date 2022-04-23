// import React, {useEffect, useState} from 'react';
// import ContestService from "../services/ContestService";
//
// const GymListComponent = () => {
//
//     const [gyms, setGyms] = useState([]);
//     const [value, setValue] = useState('');
//
//     const [loading, setLoading] = useState(false);
//     const [currPage, setCurrPage] = useState(1);
//     const [gymsPerPage] = useState(10);
//
//     useEffect(() => {
//         const getAllGyms = async () => {
//             setLoading(true)
//             ContestService.getListAllGym().then((res) => {
//                 setGyms(res.data.result)
//                 setLoading(false)
//                 console.log(res.data.result);
//             }).catch(err => {
//                 console.log(err);
//             })
//         }
//
//         getAllGyms().then(r => console.log(r)).catch(err => console.log(err))
//     }, [])
//
//     const load = () => {
//         if (loading)
//             return <h2>Заргузка доступных тренировок</h2>
//     }
//
//     const renderTable = () => {
//         return gyms.map(
//             gym =>
//                 <tr key={gym.id}>
//                     <td>{gym.id}</td>
//                     <td>{gym.name}</td>
//                 </tr>
//         )
//     }
//     //
//     // const filteredGyms = gyms.filter(gym => {
//     //     return gym.name.toLowerCase().includes(value.toLowerCase());
//     // })
//
//     const pagination = (gymsPerPage, totalGyms) => {
//         const pageNumbers = [];
//         for (let i = 1; i <= Math.ceil(totalGyms / gymsPerPage);i++) {
//             pageNumbers.push(i);
//         }
//
//         return  <div className="pagination">
//
//         </div>
//     }
//
//     const lastIndexGym = () => currPage * gymsPerPage;
//     const firstGymIndex = () => lastIndexGym - gymsPerPage;
//     const currentGym = () => gyms.slice(firstGymIndex, lastIndexGym);
//
//     return (
//         // <div>
//         //     <div className="search__form bg-dark" >
//         //         <form>
//         //             <input
//         //                 type="text"
//         //                 placeholder="Поиск тренировки ..."
//         //                 onChange={(event)=> setValue(event.target.value)}
//         //             />
//         //         </form>
//         //     </div>
//         //     <h2 className="text-center">Gym list</h2>
//         //     <table className="table table-bordered table-striped">
//         //         <thead>
//         //         <tr>
//         //             <th>ID</th>
//         //             <th>Name</th>
//         //         </tr>
//         //         </thead>
//         //         <tbody>
//         //         {renderTable()}
//         //         </tbody>
//         //     </table>
//         // </div>
//         <div className="container mt-5">
//             <h1 className="text-primary">Тренировки</h1>
//             {load()}
//             {renderTable()}
//         </div>
//     );
// };
//
// export default GymListComponent;