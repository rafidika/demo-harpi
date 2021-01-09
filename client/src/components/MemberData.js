import Axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react'
import '../styles/admin.css'
import EditMember from './EditMember';
import Loading from './Loading';

function MemberData() {
    const [members, setMembers] = useState("");
    
    const getMembers = async () => {
        try {
            // const response = await fetch("http://localhost:8080/admin");
            // const jsonData = await response.json();
            // setMembers(jsonData);
            await Axios.get("http://localhost:8080/admin", {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            })
            .then(res => {
                if(!res.data.tokenexp) {
                    console.log(res.data);
                    setMembers(res.data);
                }
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
            <div className="container-fluid" id="TabelDua">
                <p className="table-title">Daftar Anggota</p>
                <hr />
                {members ? (
                        <table className="table table-borderless">
                            <thead>
                                <tr>
                                    <th scope="col">Nama</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">No. HP</th>
                                    <th scope="col">Tanggal Lahir</th>
                                    <th scope="col">Domisili</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {members.map(member => (
                                    (member.verified) && (
                                        <tr key={member.id}>
                                            <td className="nama">{member.nama}</td>
                                            <td className="email">{member.email}</td>
                                            <td className="nohp">{member.hp}</td>
                                            <td className="tanggal">{member.tanggal.split("T")[0]}</td>
                                            <td className="domisili">{member.domisili}</td>
                                            <td>
                                                <EditMember data={member}/>
                                            </td>
                                        </tr>
                                    )
                                ))}
                            </tbody>
                        </table>
                ) : <Loading />}
                
            </div>
        </Fragment>
    )
}

export default MemberData;