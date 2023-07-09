import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';
// import Settings from './Setting';
import Common from './Common';
import Layouts from './Layouts';
import Financials from './Financials';
import Disclosure from './Disclosure';
import Template from './Template';
// import ContactApp from './ContactApp';
// import ScrumboardApp from './ScrumboardApp';
// import Ecommerce from './Ecommerce';
// import ChatApp from './ChatApp';
// import Wall from './Wall';
// import UserList from './UserList';

const reducers = (history) =>
  combineReducers({
    router: connectRouter(history),
    layout: Layouts,
    // dashboard: Dashboard,
    common: Common,
    disclosure: Disclosure,
    financials: Financials,
    template: Template,
    // mailApp: MailApp,
    // userList: UserList,
    // contactApp: ContactApp,
    // scrumboardApp: ScrumboardApp,
    // ecommerce: Ecommerce,
    // chatApp: ChatApp,
    // wall: Wall,
  });
export default reducers;
