import Axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react'

function MemberData() {
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

    useEffect(() => {
        getMembers();
    }, []);

    return (
        <Fragment>
            <div className="container">
                <br />
                <h2>Daftar Anggota</h2>
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
                                </tr>
                            </thead>
                            <tbody>
                                {members.map(member => (
                                    (member.verified) && (
                                        <tr key={member.id}>
                                            <td>{member.nama}</td>
                                            <td>{member.email}</td>
                                            <td>{member.hp}</td>
                                            <td>{member.tanggal.split("T")[0]}</td>
                                            <td>{member.domisili}</td>
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

export default MemberData;