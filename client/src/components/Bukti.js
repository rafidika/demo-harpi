import React, { Fragment, useState } from 'react'
import '../styles/admin.css'

function Bukti (img) {
    return (
        <Fragment>
           <button type="button" className="bukti" data-toggle="modal" data-target="#myModal">
            Lihat Bukti
            </button>
            <div class="modal" id="myModal">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title">Bukti Transfer</h4>
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                        </div>
                        <div class="modal-body">
                            <img 
                                style={{width: '100%'}} 
                                src={img.img} 
                                alt="Bukti transfer"/>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-dismiss="modal">Tutup</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Bukti;
