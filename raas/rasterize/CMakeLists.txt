# Here and below: Cmake version and out-of-source build setup
# minmimum version check
cmake_minimum_required(VERSION 3.22)
if(${CMAKE_VERSION} VERSION_LESS 3.12)
    cmake_policy(VERSION ${CMAKE_MAJOR_VERSION}.${CMAKE_MINOR_VERSION})
endif()

# no in-source builds check
if ( ${CMAKE_SOURCE_DIR} STREQUAL ${CMAKE_BINARY_DIR} )
    message( FATAL_ERROR "In-source builds not allowed! Create a build directory and run CMake from there. " )
endif()

# create project
project(
	rasterize
	VERSION 1.0
	LANGUAGES CXX
)

OPTION(BUILD_EXAMPLES "Build example applications" ON)


get_filename_component(PARENT_DIR ${CMAKE_SOURCE_DIR} DIRECTORY)

SET(CMAKE_CXX_STANDARD 11)
SET(CMAKE_MODULE_PATH ${CMAKE_MODULE_PATH} "${CMAKE_CURRENT_LIST_DIR}/cmake/")

#SET(OSP_DIR ${PARENT_DIR}/ospray/build/ospray/)
SET(OSP_DIR /opt/intel/oneapi/ospray/2.10.0/lib/cmake/ospray/osprayConfig.cmake)
SET(EMB_DIR ${PARENT_DIR}/ospray/build/embree/)
MESSAGE(STATUS ${OSP_DIR})
SET(embree_DIR ${EMB_DIR})
	#CACHE FILEPATH "Directory containing an embree-config.cmake file")

SET(ospray_DIR ${OSP_DIR})
	#CACHE FILEPATH "Directory containing an osprayConfig.cmake file")
FIND_PACKAGE(ospray REQUIRED)
#FIND_PACKAGE(embree "2.15.0" REQUIRED)
FIND_PACKAGE(embree REQUIRED)


SET(RASTERIZE_LIBS ${EMBREE_LIBRARIES} ${OSPRAY_LIBRARIES})
SET(RASTERIZE_INCLUDE_DIRS "${CMAKE_CURRENT_LIST_DIR}/include"
    ${OSPRAY_INCLUDE_DIRS} ${EMBREE_INCLUDE_DIRS})


MESSAGE(STATUS "RASTERIZE LIBS: ${RASTERIZE_LIBS}")
MESSAGE(STATUS "OSPRAY LIBS: ${OSPRAY_LIBRARIES}")
MESSAGE(STATUS "EMBREE LIBS: ${EMBREE_LIBRARIES}")
FILE(GLOB RASTERIZE_SOURCES "src/*.cpp")
#FILE(GLOB RASTERIZE_SOURCES "src/*.cpp" "src/lodepng/*.cpp")



ADD_LIBRARY(rasterize SHARED ${RASTERIZE_SOURCES})
TARGET_INCLUDE_DIRECTORIES(rasterize PUBLIC ${RASTERIZE_INCLUDE_DIRS})
TARGET_LINK_LIBRARIES(rasterize ${RASTRIZE_LIBS} pthread jpeg)

#set(ospray_parent_dir ${PARENT_DIR}/ospray)
# set paths to find required libraries (leave blank for default)
#set(ospray_path /opt/intel/oneapi/ospray/latest/lib)
#set(ospray_path ${PARENT_DIR}/ospray/build/ospray/build)
#set(embree_path ${PARENT_DIR}/ospray)
#set(openvkl_path ${CMAKE_SOURCE_DIR}/../ospray/build/openvkl/build)
#set(rkcommon_path ${CMAKE_SOURCE_DIR}/../ospray/build/rkcommon/build)
#set(tbb_path ${CMAKE_SOURCE_DIR}/../ospray/build/tbb/build)
#set(ispc_path ${CMAKE_SOURCE_DIR}/../ospray/build/ispc/build)
#set(glm_path ${CMAKE_SOURCE_DIR}/../ospray/build/glm/build)
#set(glfw_path ${CMAKE_SOURCE_DIR}/../ospray/build/glfw/build)

#message(${ospray_path})
#message(${embree_path})

# specify output directories
#set(CMAKE_ARCHIVE_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/libs)
#set(CMAKE_LIBRARY_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/libs)
#set(CMAKE_RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin)




# create (empty) target
#add_executable(rasterize ${SYSTEM} "")

# here and below: c++ setup
# set CXX version
#target_compile_features(rasterize PUBLIC cxx_std_20)
#set_target_properties(rasterize PROPERTIES CXX_EXTENSIONS OFF)


# library location setup
# find packages

# ospray
#add_directory(${ospray_path})
#find_package(ospray REQUIRED ${ospray_path})
#find_package(ospray PATHS ${ospray_path})
#find_library(ospray 
#	PATHS ${ospray_path})
#find_path(OSPRAY_INC ospray HINTS ${ospray_parent_dir}/ospray/include/ospray)
#target_include_directories(rasterize PUBLIC ${OSPRAY_INC})
#target_link_libraries(rasterize PUBLIC ospray::ospray)

# embree
#find_package(embree REQUIRED PATHS ${embree_path})
#target_link_libraries(rasterize PUBLIC embree::embree)

# openvkl
#find_package(openvkl REQUIRED PATHS ${openvkl_path})
#target_link_libraries(rasterize PUBLIC openvkl::openvkl)

# rkcommon
#find_package(rkcommon REQUIRED PATHS ${rkcommon_path})
#target_link_libraries(rasterize PUBLIC rkcommon::rkcommon)

# source file setup

add_subdirectory(include)
add_subdirectory(src)

if (BUILD_EXAMPLES)
	message(STATUS "Building examples...")
	#	add_subdirectory(example)
	ADD_EXECUTABLE(ospTutorial ${RASTERIZE_SOURCES}
        "example/ospTutorial.cpp")
	  TARGET_LINK_LIBRARIES(ospTutorial ${RASTERIZE_LIBS} pthread jpeg)
	  TARGET_INCLUDE_DIRECTORIES(ospTutorial PUBLIC ${RASTERIZE_INCLUDE_DIRS})
endif()


INSTALL(TARGETS rasterize LIBRARY DESTINATION lib)
INSTALL(DIRECTORY "${CMAKE_CURRENT_LIST_DIR}/include/" DESTINATION include
    FILES_MATCHING PATTERN "*.h")

