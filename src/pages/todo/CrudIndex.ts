import HttpCommon from '../../lib/HttpCommon';
import LibConfig  from '../../lib/LibConfig';
import Crud from './Crud';
//
const CrudIndex = {
    /**
     * getList
     * @param
     *
     * @return
     */
    getList :async function (): Promise<any>
    {
        try{
            const postItem = {
                userId: Number(import.meta.env.PUBLIC_USER_ID),
            }
console.log(postItem); 
            const json = await HttpCommon.server_post(postItem, "/todos/get_list");
console.log(json);      
            let items: any[] = [];
            items = json.data;
console.log(items);
            return items;
        } catch (e) {
            console.error(e);
            throw new Error("Error, getList");
        } 
    },  
    /**
     *
     * @param
     *
     * @return
     */
    addItem : async function() : Promise<any>
    {
        try{
            let ret = false;
            const values = Crud.getInputValues();
            values.userId = import.meta.env.PUBLIC_USER_ID;
            values.content = "";
            values.completed = 1;
console.log(values);
            const json = await HttpCommon.server_post(values, '/todos/create');
        console.log(json);
            if (json.ret ===  LibConfig.OK_CODE) {
                ret = true;
            } 
            return ret;
        } catch (e) {
            console.error("Error, addItem");
            console.error(e);
            throw new Error('Error , addItem');
        }
    },
  /**
   * delete:
   * @param key: any
   *
   * @return
   */   
    delete : async function(id: number) : Promise<any>
    {
        try{
            let ret = false;
            const item = {
                id: id
            }
        //console.log(item);
            const json = await HttpCommon.server_post(item, '/todos/delete');
        //console.log(json);
            if (json.ret ===  LibConfig.OK_CODE) {
                ret = true;
            }      
            return ret;      
        } catch (e) {
            console.error(e);
        }
    },         
}

export default CrudIndex;
