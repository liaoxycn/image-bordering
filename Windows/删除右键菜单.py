import winreg as reg
def delete_reg_key(root_key,key,menu_name):
    '''
    删除一个右键菜单注册表子键
    :param root_key:根键
    :param key: 父键
    :param menu_name: 菜单子键名称
    :return: None
    '''
    try:
        parent_key = reg.OpenKey(root_key,key)
    except Exception as msg:
        print(msg)
        return
    if parent_key:
        try:
            menu_key = reg.OpenKey(parent_key,menu_name)
        except Exception as msg:
            print(msg)
            return
        if menu_key:
            try:
                # 必须先删除子键的子键，才能删除子键本身
                reg.DeleteKey(menu_key,'command')
            except Exception as msg:
                print(msg)
                return
            else:
                reg.DeleteKey(parent_key,menu_name)

if __name__ == '__main__':
    menu_name = 'ImageBordering'
    delete_reg_key(reg.HKEY_CLASSES_ROOT,r'*\\shell',menu_name)