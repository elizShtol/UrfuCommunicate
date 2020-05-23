import React from 'react'
import {NavLink} from "react-router-dom";
import StudTable from "./StudentTable/StudTable";
import s from './NewTeam.module.css'
import SuccessAlert from "../Alert/SuccessAlert";
import {validSearchInput} from "../../helpers/validForm"

class NewTeam  extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            teamName: 'M-123',
            description: '',
            subjectName: '',
            searchValue: '',
            studentsList: [],
            findError: false
        }
        this.changeInputHandler = this.changeInputHandler.bind(this)
        this.submitTeamDataHandler = this.submitTeamDataHandler.bind(this)
        this.removeStudentHandler = this.removeStudentHandler.bind(this)
        this.addStudentHandler = this.addStudentHandler.bind(this)
        this.findStudent = this.findStudent.bind(this)

    }

    findStudent(e) {
        const {searchValue} = this.state;
        e.preventDefault()
        let searchValidValue = validSearchInput(searchValue)
        if (searchValidValue) {
            this.props.getNewStudent({searchValidValue})
            this.setState(prev => ({
                ...prev,
                findError: false
            }))
        } else {
            this.setState(prev => ({
                ...prev,
                findError: true
            }))
        }
        console.log(validSearchInput(searchValue))
    }


     includeStudent(arr, student) {
        for (let i=0; i< arr.length; i++)
        {
            if (arr[i].studentId === student.studentId)
            {
                return true;
            }
        }
        return false;
    }


    changeInputHandler(e) {
        const fieldName = e.target.name;
        const fieldValue = e.target.value;
        this.setState(prev => ({
            ...prev,
            [fieldName]: fieldValue
        }))
    }

    removeStudentHandler(id) {
        this.setState(prev => ({
            ...prev,
            studentsList: prev.studentsList.filter((stud) => {
                return stud.studentId !== id;
            })
        }))
    }

    addStudentHandler(student) {
        if (!this.includeStudent(this.state.studentsList, student)) {
            this.setState(prev => ({
                ...prev,
                studentsList: [
                    ...prev.studentsList,
                    student
                ]
            }))
        }
    }

    submitTeamDataHandler(e) {
        const {id, token} = this.props;
        const {teamName, description, studentsList, subjectName} = this.state;
        e.preventDefault()
        this.props.createGroup({id, token, subjectName, teamName, description, studentsList})
        console.log('subject: ', subjectName)
    }


    render() {
        const {newStudentArr, group} = this.props;
        const {teamName, studentsList, subjectName, description, findError} = this.state;
        return (
            <div className={s.container}>
                <NavLink className={s.backToProfile} to="/teacherProfile">Вернуться на главную</NavLink>


                { group.isGroupCreate
                &&
                <SuccessAlert text={'Команда создана'}>
                    <NavLink
                        onClick={() => this.props.clearGroupCreate()}
                        to={`/teacherProfile/group-${group.groupId}`}
                    >
                        Перейти на страницу группы
                    </NavLink>
                </SuccessAlert>
                }

                {!group.isGroupCreate &&<div><h4 className={s.title}>Создание новой команды</h4>
                    <div className={s.baseInfoWrap}>
                        <div className={s.inputWrap}>
                            <input
                                type="text"
                                value={this.state.teamName}
                                placeholder="Введите название команды"
                                className={s.inputName}
                                onChange={this.changeInputHandler}
                                name="teamName"
                            />
                        </div>

                        <div className={s.inputWrap}>
                            <input
                                type="text"
                                value={this.state.description}
                                placeholder="Описание команды"
                                className={s.inputName}
                                onChange={this.changeInputHandler}
                                name="description"
                            />
                        </div>

                        <div className={s.inputWrap}>
                            <input
                                type="text"
                                value={this.state.subjectName}
                                placeholder="Название предмета"
                                className={s.inputName}
                                onChange={this.changeInputHandler}
                                name="subjectName"
                            />
                        </div>
                    </div>


                    <div className={s.box}>
                        <div className={s.leftBox}>
                            <form onSubmit={this.findStudent} className={s.searchForm}>
                               {findError &&
                                <label className={s.findError} htmlFor="search">Введите только фамилию</label>
                                }
                                <div className={s.findInputWrap}>
                                    <input
                                        name="searchValue"
                                        placeholder="Фамилия студента"
                                        type="search"
                                        id="search"
                                        onChange={this.changeInputHandler}
                                        value={this.state.searchValue}
                                        className={findError ? s.searchInputError : s.searchInput}
                                    />
                                    <button type="submit" className={s.sendFormBtn}>Найти</button>
                                </div>
                            </form>

                            <StudTable
                                newStudentArr={newStudentArr}
                                studentsList={this.state.studentsList}
                                cb={(student) => this.addStudentHandler(student)}
                                /*students={
                                [
                                    {studentId: '1', studentName: 'Павел Викторов Сергеевич', group: 'М-2014'},
                                    {studentId: '2', studentName: 'Павел Котов Сергеевич', group: 'М-2014'},
                                    {studentId: '3', studentName: 'Павел Вров Сергеевич', group: 'М-2014'},
                                    {studentId: '4', studentName: 'Павел Пкцуоров Сергеевич', group: 'М-2014'},
                                    {studentId: '5', studentName: 'Павел укцикторов Сергеевич', group: 'М-2014'},
                                    {studentId: '6', studentName: 'Павел Белковский Сергеевич', group: 'М-2014'},
                                    {studentId: '7', studentName: 'Павел Триоон Сергеевич', group: 'М-2014'},
                                    {studentId: '8', studentName: 'Павел ВКуцк Сергеевич', group: 'М-2014'},
                                    {studentId: '9', studentName: 'Павел Викторов Сергеевич', group: 'М-2014'},
                                    {studentId: '10', studentName: 'Павел Викторов Сергеевич', group: 'М-2014'},
                                    {studentId: '11', studentName: 'Павел Викторов Сергеевич', group: 'М-2014'},
                                    {studentId: '12', studentName: 'Павел Викторов Сергеевич', group: 'М-2014'},
                                    {studentId: '13', studentName: 'Павел Викторов Сергеевич', group: 'М-2014'},
                                    {studentId: '14', studentName: 'Павел Викторов Сергеевич', group: 'М-2014'},
                                    {studentId: '15', studentName: 'Павел Викторов Сергеевич', group: 'М-2014'},
                                    {studentId: '16', studentName: 'Павел Викторов Сергеевич', group: 'М-2014'},
                                    {studentId: '17', studentName: 'Павел Викторов Сергеевич', group: 'М-2014'},
                                    {studentId: '18', studentName: 'Павел Викторов Сергеевич', group: 'М-2014'},
                                    {studentId: '19', studentName: 'Павел Викторов Сергеевич', group: 'М-2014'},
                                    {studentId: '20', studentName: 'Павел Викторов Сергеевич', group: 'М-2014'},
                                ]*/
                            />

                            <div className={s.makeTeamWrap}>
                                <button
                                    className={s.makeTeamBtn}
                                    onClick={this.submitTeamDataHandler}
                                    disabled={!(teamName && studentsList[0] && subjectName && description)}
                                >
                                    Создать команду
                                </button>
                            </div>
                        </div>


                        <div className={s.listWrap}>
                            <div className={s.listItemsWrap}>
                                <h4 className={s.studentListTitle}>
                                    Спиок добавленных студентов
                                </h4>
                                {this.state.studentsList.length > 0
                                    ? (
                                        <div>
                                            {this.state.studentsList.map((stud, index) => {
                                                return (
                                                    <div
                                                        key={stud.studentId}
                                                        className={s.listItem}
                                                    >
                                                        <div className={s.studentItemLeft}>
                                                            <div className={s.studentIndex}>{index + 1})</div>
                                                            <div className={s.studentName}>
                                                                {stud.studentName}
                                                            </div>
                                                        </div>
                                                        <div
                                                            onClick={() => this.removeStudentHandler(stud.studentId)}
                                                            className={s.studentFlag}
                                                        >
                                                            удалить
                                                        </div>
                                                    </div>
                                                )
                                            })
                                            }
                                        </div>
                                    )
                                    :
                                    (<div className={s.emptyStudentList}>Список пуст</div>)
                                }
                            </div>
                        </div>
                    </div>
                </div>}
            </div>
        );
    }
}

export default NewTeam;