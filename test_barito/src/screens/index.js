import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';
import All from './private/AllList';
import Done from './private/IsDoneList';
import notDone from './private/notDoneList';

const todos = createBottomTabNavigator(
  {
    All: {
      screen: All,
      navigationOptions: {
        header: null,
      },
    },
    Done: {
      screen: Done,
      navigationOptions: {
        header: null,
      },
    },
    notDone: {
      screen: notDone,
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    tabBarOptions: {
      labelStyle: {
        fontSize: 18,
      },
    },
  },
);

export default createAppContainer(todos);
