# coding:utf-8
import os
import winreg as reg
import sys
def add_context_menu(menu_name,command,reg_root_key_path,reg_key_path,shortcut_key):
    '''
    封装的添加一个右键菜单的方法
    :param menu_name: 显示的菜单名称
    :param command: 菜单执行的命令
    :param reg_root_key_path: 注册表根键路径
    :param reg_key_path: 要添加到的注册表父键的路径（相对路径）
    :param shortcut_key: 菜单快捷键，如：'S'
    :return:
    '''
    # 打开名称父键
    key = reg.OpenKey(reg_root_key_path, reg_key_path)
    # 为key创建一个名称为menu_name的sub_key，并设置sub_key的值为menu_name加上快捷键，数据类型为REG_SZ字符串类型
    reg.SetValue(key, menu_name, reg.REG_SZ, menu_name + '(&{0})'.format(shortcut_key))

    # 打开刚刚创建的名为menu_name的sub_key
    sub_key = reg.OpenKey(key, menu_name)
    # 为sub_key添加名为'command'的子键，并设置其值为command + ' "%v"'，数据类型为REG_SZ字符串类型
    reg.SetValue(sub_key, 'command', reg.REG_SZ, command + ' "%v"')

    # 关闭sub_key和key
    reg.CloseKey(sub_key)
    reg.CloseKey(key)

def add_show_menu():
    '''
    添加右键菜单，可以在右键点击一个文件、目录、文件夹空白处或驱动器盘符后在命令行中打印出当前的绝对路径
    :return: None
    '''
    # 菜单名称
    menu_name = '边框水印'
    # 执行一个python脚本的命令，用于打印命令行参数的第二个参数（即选中的文件路径）
    dir = os.path.dirname(os.path.abspath(__file__))
    py_command = dir+'\加边框.bat'
    print(py_command)


    # 添加文件右键菜单
    add_context_menu(menu_name,py_command,reg.HKEY_CLASSES_ROOT,r'*\\shell','B')

if __name__ == '__main__':
    params = sys.argv[0].strip()
    print(params)
    add_show_menu()