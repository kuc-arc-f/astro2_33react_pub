import {useState, useEffect}  from 'react';
//import HttpCommon from '../../lib/HttpCommon';
import CrudIndex from './CrudIndex';
import AlertError from '../common/AlertError'
import AlertSuccess from '../common/AlertSuccess'
//
const ALERT_ERROS_ID = "alert_error_id_1";
const ALERT_SUCCESS_ID = "alert_success_id_1";
const ERROS_MESSAGE_1 = "Error, title input";
const SUCCESS_MESSAGE_1 = "OK, Save";

//
let pageItem: any[] = [];
//
function Page () {
    const [updatetime, setUpdatetime] = useState<string>("");
    //
    const updateTimestap = function() {
        const dt = new Date().toString();
        setUpdatetime(dt);
    }
    //
    useEffect(() => {
        (async () => {
            getList();
        })()

    }, []);
    /**
     *
     * @param
     *
     * @return
     */
    const getList = async function() {
        try{
            const d = await CrudIndex.getList()
            pageItem = d;
            updateTimestap();
        } catch (e) {
            console.error(e);
        } 
    }
    /**
     *
     * @param
     *
     * @return
     */
    const createTodo = async function() {
        try{
            const result = await CrudIndex.addItem(ALERT_ERROS_ID);
            if(result) {
//                displayAlert();
                getList();
                CrudIndex.displayAlert(ALERT_SUCCESS_ID)
            }
        } catch (e) {
            console.error(e);
        } 
    }
    /**
     *
     * @param
     *
     * @return
     */
    const todoDelete = async function(id: number) {
        try{
            const result = await CrudIndex.delete(id);
            if(result) {
                getList();
            }
        } catch (e) {
            console.error(e);
        } 
    }    
console.log(updatetime);
    //
    return (
    <div><h3>Todo</h3>
        <span className="d-none">{updatetime}</span>
        <hr />
        <label>Title: <input id="title" className="form-control" /></label>
        <button onClick={()=>createTodo()} className="btn btn-sm btn-primary ms-2" 
            >Create</button>        
        <hr />
        {pageItem.map((item: any ,index: number) => {
        return (
        <div key={index}>
            <h3>{item.title}</h3>
            <span>ID: {item.id}, {item.createdAt}</span>
            {/*
            <button onClick={()=>openShow(item.id)} className="btn btn-sm btn-outline-primary ms-2">Show</button>
            <a href={`/todo2/edit/${item.id}`} className="btn btn-sm btn-outline-primary ms-2">Edit</a>
            */}
            <button onClick={()=>todoDelete(item.id)} className="btn btn-sm btn-outline-danger ms-2" 
            >Delete</button>
            <hr />
        </div>
        )
        })}
        {/* Alert */}
        <AlertError idName={ALERT_ERROS_ID} message={ERROS_MESSAGE_1} />  
        <AlertSuccess idName={ALERT_SUCCESS_ID} message={SUCCESS_MESSAGE_1} />      
    </div>    
    );
}
export default Page;
