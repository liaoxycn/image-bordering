    # 添加文件右键菜单
 add_context_menu(menu_name,py_command,reg.HKEY_CLASSES_ROOT,r'*\\shell','S')
    # 添加文件夹右键菜单
    add_context_menu(menu_name, py_command, reg.HKEY_CLASSES_ROOT, r'Directory\\shell', 'S')
    # 添加文件夹空白处右键菜单
    add_context_menu(menu_name, py_command, reg.HKEY_CLASSES_ROOT, r'Directory\\Background\\shell', 'S')
    # 添加磁盘驱动器右键菜单
    add_context_menu(menu_name, py_command, reg.HKEY_CLASSES_ROOT, r'Drive\\shell', 'S')