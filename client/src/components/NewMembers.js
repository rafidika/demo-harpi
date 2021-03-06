import Axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react'
import Bukti from './Bukti'
// import { generateIdCard, IdCardModal } from './IdCardModal'
import '../styles/admin.css'
import IdCardModal from './IdCardModal';
import generateIdCard from './generateIdCard';
import Loading from './Loading';

const NewMembers = () => {
    const [members, setMembers] = useState();
    
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

    const deleteMember = async (id) => {
        try {
           await Axios.delete(`http://localhost:8080/admin/${id}`, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            })
           .then(setMembers(members.filter(member => member.id !== id)))
           .then(getMembers());
        } catch (err) {
            console.log(err.message);
        }
    }

    const getOneMember = (id) => {
        const elementPos = members.map(member => member.id).indexOf(id);
        return members[elementPos];
    }

    // const imgUrl = (idImg, img) => {
    //     const elementPos = members.map(member => member.id).indexOf(idImg);
    //     let idCardMember = members[elementPos];
    //     idCardMember.idcard = img;
    //     const newMemb = members;
    //     newMemb[elementPos] = idCardMember;
    //     setMembers(newMemb);
    // }

    useEffect(() => {
        getMembers();
    }, []);

    return (
        <Fragment>
            {/* <IdCard id={1} /> */}
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
                                    {/* <th scope="col"></th> */}
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
                                                <IdCardModal data={member}/>
                                            </td>
                                            <td>
                                                <button 
                                                    className="hapus" 
                                                    onClick={() => deleteMember(member.id)}>
                                                        Hapus
                                                </button>
                                            </td>
                                            {/* <IdCard id={member.id} imgUrl={imgUrl} /> */}
                                        </tr>
                                    )
                                ))}
                            </tbody>
                        </table>
                    
                ) : <Loading className="d-flex justify-content-center" />}
                
            </div>
        </Fragment>
    )
}

export default NewMembers;
