import Axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react'
import Bukti from './Bukti'

const NewMembers = () => {
    const [members, setMembers] = useState("");
    
    const getMembers = async () => {
        try {
            // const response = await fetch("http://localhost:8080/admin");
            // const jsonData = await response.json();
            // setMembers(jsonData);
            await Axios.get("http://localhost:8080/admin")
            .then(res => {
                setMembers(res.data);
            })
        } catch (err) {
            console.error(err.message);
        }
    };
    const verifMember = async (verif) => {
        const elementPos = members.map(member => member.id).indexOf(verif);
        let verifyMember = members[elementPos];
        verifyMember.verified = true;
        try {
            await Axios.put(`http://localhost:8080/admin/${verif}`, verifyMember)
            .then(window.location.href = "/admin");
        } catch (err) {
            console.log(err.message);
        }
    }

    const deleteMember = async (id) => {
        try {
           await Axios.delete(`http://localhost:8080/admin/${id}`)
           .then(setMembers(members.filter(member => member.id !== id)))
           .then(window.location.href = "/admin");
        } catch (err) {
            console.log(err.message);
        }
    }

    useEffect(() => {
        getMembers();
    }, []);

    return (
        <Fragment>
            <div className="container">
                <br />
                <h2>Anggota Baru</h2>
                <hr />
                {members ? (
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Nama</th>
                                    <th>Email</th>
                                    <th>No. HP</th>
                                    <th>Tanggal Lahir</th>
                                    <th>Domisili</th>
                                    <th>Bukti Transfer</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {members.map(member => (
                                    (!member.verified) && (
                                        <tr key={member.id}>
                                            <td>{member.nama}</td>
                                            <td>{member.email}</td>
                                            <td>{member.hp}</td>
                                            <td>{member.tanggal.split("T")[0]}</td>
                                            <td>{member.domisili}</td>
                                            <td>
                                                <Bukti img={member.buktitrf} />
                                                {/* <p>{member.buktitrf}</p> */}
                                            </td>
                                            <td>
                                                <button 
                                                    className="btn btn-primary" 
                                                    onClick={() => verifMember(member.id)}>
                                                        Verfikasi
                                                </button>

                                            </td>
                                            <td>
                                                <button 
                                                    className="btn btn-danger" 
                                                    onClick={() => deleteMember(member.id)}>
                                                        Hapus
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                ))}
                            </tbody>
                        </table>
                    
                ) : <h2>Loading...</h2>}
                
            </div>
        </Fragment>
    )
}

export default NewMembers;
