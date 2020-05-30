import React from 'react'
import s from './Chat.module.css'


const Chat  = ({messages = [],teacher}) => {
    return (
        <>
            {teacher &&
        <div className={s.messagesWrap}>
            {
                messages.map(mess => {
                    return (
                        <div className={s.messWrap}>
                            <div className={s.messRow}>
                                <div className={s.messSender}>{teacher}</div>
                                <div className={s.messTime}>{mess.time}</div>
                            </div>
                            <p className={s.messText}>{mess.text}</p>

                        </div>
                    )
                })
            }
        </div>
        }
        </>
    );
}

export default Chat;