import React, {Component} from 'react';
import {Text, View, StyleSheet, FlatList, Dimensions} from 'react-native';
import {Header} from 'native-base';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {PulseIndicator} from 'react-native-indicators';

import fetchAllData from '../../_store/todoList';
import {GET_METHOD, PUT_METHOD, DELETE_METHOD} from '../../config/constans';

class IsDoneList extends Component {
  handleGetData = () => {
    this.props.fetchAllData(GET_METHOD, null, null);
  };

  header = () => {
    return (
      <Header androidStatusBarColor="rgb(141, 90, 184)" style={styles.header}>
        <Text style={styles.text}>To Do List</Text>
      </Header>
    );
  };

  validationCheckBoc = async (name, completed, id) => {
    let setCompleted;
    if (completed) {
      setCompleted = false;
    } else {
      setCompleted = true;
    }
    const params = {
      name,
      setCompleted,
    };
    // console.log(params.setCompleted);
    await this.props.fetchAllData(PUT_METHOD, params, id);
    // alert('Checkbox changed');
    await this.handleGetData();
  };

  iconCheck = (name, completed, id) => {
    // const {data} = this.props.todos;
    // console.log(JSON.stringify(data));
    if (completed)
      return (
        <Icon
          name="check-box-outline"
          size={30}
          onPress={() => this.validationCheckBoc(name, completed, id)}
        />
      );
    else
      return (
        <Icon
          name="checkbox-blank-outline"
          size={30}
          onPress={() => this.validationCheckBoc(name, completed, id)}
        />
      );
  };

  renderingList = (name, completed, id) => {
    return (
      <View style={styles.viewRenderMain}>
        {this.iconCheck(name, completed, id)}
        {/* <Icon name="check-box-outline" size={30} /> */}
        <View style={styles.viewRenderSecond}>
          <Text style={styles.name}>{name}</Text>
        </View>
      </View>
    );
  };

  list = datas => {
    return (
      <FlatList
        data={datas}
        renderItem={({item}) =>
          this.renderingList(item.name, item.completed, item._id)
        }
        keyExtractor={item => item._id}
      />
    );
  };

  render() {
    const {todos} = this.props;
    let check =
      todos.data.length > 0
        ? todos.data.filter(item => {
            return item.completed == false;
          })
        : todos.data;

    if (todos.isLoading) {
      return (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <PulseIndicator color="rgba(141, 90, 184,0.8)" />
        </View>
      );
    }
    // let newTodos = todos.data.length > 0 ? check : [];

    // console.log(todos.data.length > 0 ? true : false);
    // let newTodos = todos.data.length > 0 ? check : [];
    // console.log(JSON.stringify(newTodos, null, 2));
    // console.log(JSON.stringify(todos.data, null, 2));
    return (
      <View>
        {this.header()}
        {this.list(check)}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  todos: state.todoList,
});

const mapDispatchToProps = {
  fetchAllData,
};

export default connect(mapStateToProps, mapDispatchToProps)(IsDoneList);

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
  },
  header: {
    backgroundColor: 'rgba(141, 90, 184,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
  name: {
    fontSize: 20,
  },
  viewRenderMain: {
    marginLeft: 5,
    marginRight: 10,
    marginTop: 15,
    flexDirection: 'row',
    borderBottomColor: 'purple',
    borderBottomWidth: 2,
  },
  viewRenderSecond: {
    width: Dimensions.get('window').width - 20,
    marginLeft: 5,
  },
});
