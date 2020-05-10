import React from 'react'
import Chat from '../../Chat/Chat'
import {NavLink} from "react-router-dom";
import s from './TeacherGroup.module.css'

class TeacherGroup extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            newMessage: ''
        }
        this.changeMessageHandler = this.changeMessageHandler.bind(this)
        this.sendMessageHandler = this.sendMessageHandler.bind(this)
    }

    changeMessageHandler(e) {
        const fieldName = e.target.name
        const fieldValue = e.target.value
        this.setState((prev) => ({
            [fieldName]: fieldValue
        })
        )
    }

    sendMessageHandler(e) {
        const {id, token} = this.props;
        const msg = this.state.newMessage;
        e.preventDefault()
        this.props.sendMessage({id,token,msg})
    }

    render() {
        const {group,error} = this.props;
        if (group.title) {
            return (
                <div className={s.container}>
                    <NavLink className={s.backToProfile} to="/teacherProfile">
                        Вернуться на главную
                    </NavLink>
                    <div className={s.row}>
                        <div className={s.leftRow}>
                            <h3 className={s.groupTitle}>{group.title}</h3>
                            <div className={s.groupDesc}>{group.description}</div>
                        </div>
                        <div className={s.addStudentWrap}>
                            <NavLink to="/teacherProfile/edit" className={s.addStudentBtn}>
                                <span>
                                    Добавить участника
                                </span>
                            </NavLink>
                        </div>
                    </div>


                    <div className={s.docsBlock}>
                        <h3 className={s.docsTitle}>Документы</h3>
                    </div>

                    <div>send file zone</div>


                    <div className={s.messagesBlock}>
                        <h3 className={s.messagesTitle}>Объявления</h3>
                        <Chat messages={group.messages} teacher={group.teacher}/>
                    </div>

                    <div className={s.sendMsgBlock}>
                        <h3 className={s.sendMsgTitle}>Send message zone</h3>
                        <form
                            onSubmit={this.sendMessageHandler}
                            className={s.sendMsgForm}>
                            <textarea
                                value={this.state.newMessage}
                                onChange={this.changeMessageHandler}
                                className={s.sendMsgInput}
                                type="text"
                                name="newMessage"
                                placeholder="Введите сообщение"
                            />
                            <button
                                className={s.sendMsgBtn}
                                type="submit"
                            >
                                Отправить сообщение
                            </button>
                        </form>
                    </div>

                </div>
            )
        }
        else {
            return (
                <>
                    <NavLink className={s.backToProfile} to="/teacherProfile">
                        Вернуться на главную
                    </NavLink>
                    <div className={s.error}>{error}</div>
                </>

            )
        }
    }
}

export default TeacherGroup;