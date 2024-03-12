<?php
//Show Image - TO BE REMOVED!!
if(isset($_GET['img'])){
  echo '<html><head><title>hardinfo2.org</title>
  <meta charset="utf-8"/><meta name="robots" content="noindex"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="/css/default.css">
  <link rel="icon" type="image/x-icon" href="favicon.ico"></head><body>';
  echo "<a href='/'><img width=100% src='/img/".basename($_GET['img'])."'><h1>Click on Picture to Return</h1></a>";
  echo "</body></html>";
  exit(0);
}

//API Interface
if($_SERVER['REQUEST_URI']=="/benchmark.json"){
  //Save data
  if($_SERVER['REQUEST_METHOD']=="POST"){
      //Store JSON in Mariadb
      $j=json_decode(file_get_contents("php://input"),true,3);
      $mysqli=new mysqli("127.0.0.1","hardinfo","hardinfo","hardinfo");
      foreach($j as $k=>$v){
          $stmt=$mysqli->prepare("insert into benchmark_result values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?, unix_timestamp(now()),? );");
          $stmt->bind_param('sdsssssiiiiisssiiiisdiiis',$k,$v['BenchmarkResult'],$v['ExtraInfo'],$v['MachineId'],$v['Board'],$v['CpuName'],$v['CpuConfig'],$v['NumCpus'],$v['NumCores'],$v['NumThreads'],$v['MemoryInKiB'],$v['PhysicalMemoryInMiB'],$v['MemoryTypes'],$v['OpenGlRenderer'],$v['GpuDesc'],$v['PointerBits'],$v['DataFromSuperUser'],$v['UsedThreads'],$v['BenchmarkVersion'],$v['UserNote'],$v['ElapsedTime'],$v['MachineDataVersion'],$v['Legacy'],$v['NumNodes'],$v['MachineType']);
          $stmt->execute();
      }
  }
  //Fetch data
  if($_SERVER['REQUEST_METHOD']=="GET"){
      $mysqli=new mysqli("127.0.0.1","hardinfo","hardinfo","hardinfo");
      $d=array();
      $qbt=$mysqli->query("Select benchmark_type from benchmark_result group by benchmark_type;");
      while($rbt=$qbt->fetch_array()){
         $q=$mysqli->query("Select machine_id, extra_info, user_note, machine_type, benchmark_version, AVG(benchmark_result) AS benchmark_result,
             board, cpu_name, cpu_config, num_cpus, num_cores,
             num_threads, memory_in_kib, physical_memory_in_mib, memory_types, opengl_renderer,
             gpu_desc, pointer_bits, data_from_super_user, used_threads,
             elapsed_time, machine_data_version, legacy, num_nodes
	     from benchmark_result where benchmark_type='".$rbt[0]."' and (left(machine_type,7)!='Virtual') group by cpu_name order by rand() limit 50");//,pointer_bits;");
         while($r=$q->fetch_array()){
	    $a=array();
	    $a['MachineId']=$r[0];
	    $a['ExtraInfo']=$r[1];
	    $a['UserNote']=$r[2];
	    $a['MachineType']=$r[3];
	    $a['BenchmarkVersion']=1*$r[4];
	    $a['BenchmarkResult']=1*$r[5];
	    $a['Board']=$r[6];
	    $a['CpuName']=$r[7];
	    $a['CpuConfig']=$r[8];
	    $a['NumCpus']=1*$r[9];
	    $a['NumCores']=1*$r[10];
	    $a['NumThreads']=1*$r[11];
	    $a['MemoryInKiB']=1*$r[12];
	    $a['PhysicalMemoryInMiB']=1*$r[13];
	    $a['MemoryTypes']=$r[14];
	    $a['OpenGlRenderer']=$r[15];
	    $a['GpuDesc']=$r[16];
	    $a['PointerBits']=1*$r[17];
	    $a['DataFromSuperUser']=0;//1*$r[18];
	    $a['UsedThreads']=1*$r[19];
	    $a['ElapsedTime']=1*$r[20];
	    $a['MachineDataVersion']=1*$r[21];
	    $a['Legacy']=1*$r[22];
	    $a['NumNodes']=1*$r[23];
            $d[$rbt[0]][]=$a;
         }
      }
      echo json_encode($d);
  }
  exit(0);
}

if($_SERVER['SCRIPT_URL']=="/blobs-update-version.json"){
  //Fetch data
  if($_SERVER['REQUEST_METHOD']=="GET"){
      $mysqli=new mysqli("127.0.0.1","hardinfo","hardinfo","hardinfo");
      $q=$mysqli->query("Select value from settings where name='blobs-update-version'");
      $r=$q->fetch_array();
      $a=array();
      $a['update-version']=$r[0];
      $a['program-version']=$_GET['ver'];
      echo json_encode($a);
  }
  exit(0);
}

header('HTTP/1.0 404 Not Found');
http_response_code(404);
?>