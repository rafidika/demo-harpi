import Axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react'
import Bukti from './Bukti'
import '../styles/admin.css'

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
            await Axios.put(`http://localhost:8080/admin/verify/${verif}`, verifyMember)
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
            <div className="container-fluid" id="TabelSatu">
                <p className="table-title">Permohonan Anggota Baru</p>
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
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {members.map(member => (
                                    (!member.verified) && (
                                        <tr key={member.id}>
                                            <td className="nama">{member.nama}</td>
                                            <td className="email">{member.email}</td>
                                            <td className="tanggal">{member.hp}</td>
                                            <td className="tanggal">{member.tanggal.split("T")[0]}</td>
                                            <td className="domisili">{member.domisili}</td>
                                            <td>
                                                <Bukti img={member.buktitrf} />
                                            </td>
                                            <td>
                                                <button 
                                                    className="verifikasi" 
                                                    onClick={() => verifMember(member.id)}>
                                                        Verfikasi
                                                </button>

                                            </td>
                                            <td>
                                                <button 
                                                    className="hapus" 
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
