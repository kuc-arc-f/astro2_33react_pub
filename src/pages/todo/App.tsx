import {useState, useEffect}  from 'react';
import HttpCommon from '../../lib/HttpCommon';
import CrudIndex from './CrudIndex';
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
            /*
            const d = await CrudIndex.getList()
            pageItem = d;
            updateTimestap();
console.log(d);
            */
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
            const result = await CrudIndex.addItem();
            if(result) {
                window.location.reload();
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
    </div>    
    );
}
export default Page;
