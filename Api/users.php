<?php
class user{

    public function controller($postAction){
        if($postAction == "test"){
            echo "test!!";
            exit();
        }else;{
            echo "「users.php」関数がありません";
            exit();
        }

    }


    //フォルダの作成
    public function createDirectory(){
        $result = "";
        $directoryName = 'test';
        //フォルダパスを作成
        $directoryPath = '../User/test'.$directoryName;
        //フォルダの存在確認
        if(!(file_exists($directoryPath))){
            $result="ディレクトリを作成します\n";
            //ディレクトリ作成処理
            if(mkdir($directoryPath,0777)){
                //作成したディレクトリのパーミッションの変更（一応）
                chmod($directoryPath,0777);
                $result="作成が完了しました";
            }else{
                $result="作成に失敗しました";
            }
        }else{
            $result ="そのディレクトリはすでに存在します";
        }
        echo $result."\n".$directoryPath;

    }

}