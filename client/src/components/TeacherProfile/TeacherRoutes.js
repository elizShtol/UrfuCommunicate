import React from 'react';
import {Route, Switch, Redirect} from "react-router-dom";
import NewTeamContainer from '../../containers/NewTeamContainer'
import NotFound from '../NotFound/NotFound'
import TeacherGroupContainer from "../../containers/TeacherGroupContainer";
import EditGroupContainer from '../../containers/EditGroupContainer'
import TeacherHomeContainer from "../../containers/TeacherHomeContainer";

export const TeacherRoutes = () => {
    return (
        <Switch>
            <Route path="/teacherProfile" exact component={TeacherHomeContainer}/>
            <Route path="/teacherProfile/newGroup" component={NewTeamContainer}/>
            <Route path="/teacherProfile/edit" component={EditGroupContainer}/>
            <Route path="/teacherProfile/group-:id" render={({match}) => {
                const {id} = match.params;
                console.log(match)
                return <TeacherGroupContainer groupId={id}/>
            }}/>
            <Route path="*" render={() => <NotFound
                textToBack={'Вернуться на главную'}
                linkToBack={"/teacherProfile"}
            />
            }/>
        </Switch>
    );
}