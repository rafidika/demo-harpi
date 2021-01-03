import React, { Component, useState, useEffect } from 'react'
import '../styles/idcard.css'
import { saveAs } from 'file-saver'
import domtoimage from 'dom-to-image';

export function IdCard({id, imgUrl}) {
    const [cardId, setCardId] = useState(id);
    const [generated, setGenerated] = useState(false);
    const [url, setUrl] = useState();
    // const [url, setUrl] = useState();

    useEffect(cardId => {
        generateIdCard(cardId);
    }, [cardId])

    function generateIdCard() {
        var node = document.getElementById(`id-card-${cardId.id}`);
        domtoimage.toPng(node)
        .then(function (dataUrl) {
            // console.log(cardId)
            // var img = new Image();
            // img.src = dataUrl;
            setUrl(dataUrl);
            console.log(url);
        })
        .then(imgUrl(cardId, url))
        .catch(function (error) {
            console.error('oops, something went wrong!', error);
        });
    }
    
    return (
        <div>
            <div id={`id-card-${id.id}`} class="container-id-card">
                <div class="header-id-card">
                    <img src="/assets/logo-white.png" alt="logo" class="logo-white-id" />
                    <h4 class="title-id-card">Kartu Tanda Anggota HARPI Melati</h4>
                </div>
                <h4 class="number-id-card">ID               : 123456789101112</h4>
                <h4 class="nama-id-card">Nama        : Nabelanita Utami</h4>
                <h4 class="nohp-id-card">No. HP      : 08567265625</h4>
                <div class="rectangle-id-card">
                </div>
                <h4 class="date-id-card">Bergabung pada 28 Desember 2020</h4>
            </div>
        </div>
    )
}
